export interface IDocument {
    ID: string;

    title: string;

    subtitle: string;

    sections: [];

    toJson(): string;
}
