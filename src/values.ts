export interface Presenter {
    toString(): string
}

export interface Choice extends Presenter {
    value: any;
}

export class FormFile implements File {
    constructor(private file: File, private base64URL?: string) {
    }

    static async init(file: File | String) {
        if (typeof file === 'string') {
            return await FormFile.buildFile(file);
        } else {
            const formFile = new FormFile(file as File);
            formFile.base64URL = await formFile.generateURI();
            return formFile;
        }
    }

    generateURI() {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.onerror = () => {
                reader.abort();
                reject(new Error('Загрузка файла провалилась'));
            };
            reader.readAsDataURL(this.file);
        });
    }

    toJSON() {
        return this.base64URL ? this.base64URL.replace(/data:\w*\/\w*;base64,/, '') : '';
    }

    private static generateName(): string {
        return Math.random().toString(16);
    }

    private static async buildFile(url: string): Promise<FormFile> {
        try {
            const formFile = await new Promise<FormFile>(((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        const file = new File([xhr.response], FormFile.generateName());
                        resolve(new FormFile(file));
                    } else {
                        reject(new Error(xhr.statusText));
                    }
                };
                xhr.onerror = () => {
                    reject(new Error('Загрузка файла провалилась'));
                };
                xhr.send();
            }));
            formFile.base64URL = await formFile.generateURI();
            return formFile;
        } catch (e) {
            throw e;
        }
    }

    public arrayBuffer(): Promise<ArrayBuffer> {
        return this.file.arrayBuffer();
    }

    public slice(start?: number, end?: number, contentType?: string): Blob {
        return this.file.slice(start, end, contentType);
    }

    public stream(): ReadableStream {
        return this.file.stream();
    }

    public text(): Promise<string> {
        return this.file.text();
    }

    get lastModified(): number {
        return this.file.lastModified;
    }

    get name(): string {
        return this.file.name;
    }

    get size(): number {
        return this.file.size;
    }

    get type(): string {
        return this.file.type;
    }
}

export class Option implements Choice {
    constructor(public value: string, private label: string) {
    }

    public toString(): string {
        return this.label;
    }

    public toJSON() {
        return this.value;
    }
}

export class MobileNumber {
    private readonly _number:string;
    constructor(value:string) {
        this._number = value;
    }
    get value():string {
        return this._number
    }
    toJSON() {
        return this._number.replace(/(\(|\)|\s)/g, '');
    }
}