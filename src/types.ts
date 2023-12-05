export type FileInformation = {
    fileInfo: string;
    pathSteps: PathInfo[];
}

export type PathInfo = {
    step: string;
    title: string;
    description: string;
};

export type FileMap = {
    [key: string]: FileMapItem;
};

export type FileMapItem = {
    isEditable: boolean;
    title: string;
    description: string;
    files: {
        [key: string]: SingleFileMapItem;
    }
    subDirectories?: FileMap;
};

export type SingleFileMapItem = {
    isEditable: boolean;
    title: string;
    description: string;
};