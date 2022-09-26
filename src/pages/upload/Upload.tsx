import React, {useState, useRef} from "react";
import {
    FileUploadContainer,
    FormField,
    DragDropText,
    UploadFileBtn,
    FilePreviewContainer,
    ImagePreview,
    PreviewContainer,
    PreviewList,
    FileMetaData,
    RemoveFileIcon,
    InputLabel,
} from "./styles";

interface props {
    label?: String;
    updateFilesCb?: any;
    maxFileSizeInBytes?: number;
    multiple?: any;
    accept?: string;
}

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const convertBytesToKB = (bytes: number) => Math.round(bytes / KILO_BYTES_PER_BYTE);

const FileUpload = ({
    label,
    updateFilesCb,
    maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
    ...otherProps
}: props) => {
    const fileInputField = useRef<any>(null);
    const [files, setFiles] = useState<any>({});

    const handleUploadBtnClick = () => {
        fileInputField.current.click();
    };

    const handleNewFileUpload = (e: any) => {
        const {files: newFiles} = e.target;
        if (newFiles.length) {
            let updatedFiles = addNewFiles(newFiles);
            setFiles(updatedFiles);
            callUpdateFilesCb(updatedFiles);
        }
    };
    // The addNewFiles function takes a FileList object (e.target.files above returns a FileList), iterates through it, and returns an object where the key is the file name and the value is the File object.
    const addNewFiles = (newFiles: File[]) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!otherProps.multiple) {
                    return {file};
                }
                files[file.name] = file;
            }
        }
        return {...files};
    };

    // Since React state updates are asynchronous, there is no guarantee that when the callUpdateFilesCb gets called, the files state will have changed.
    const convertNestedObjectToArray = (nestedObj: any) => Object.keys(nestedObj).map((key) => nestedObj[key]);

    const callUpdateFilesCb = (files: File[]) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    };

    // The removeFile function will take a file name, delete it from the files state, update the files state, and inform the parent component of the changes.
    const removeFile = (fileName: string) => {
        delete files[fileName];
        setFiles({...files});
        callUpdateFilesCb({...files});
    };

    return (
        <>
            <FileUploadContainer>
                <InputLabel>{label}</InputLabel>
                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                <UploadFileBtn type="button" onClick={handleUploadBtnClick}>
                    <i className="fas fa-file-upload" />
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField
                    type="file"
                    ref={fileInputField}
                    onChange={handleNewFileUpload}
                    title=""
                    value=""
                    {...otherProps}
                />
            </FileUploadContainer>
            <FilePreviewContainer>
                <span>To Upload</span>
                <PreviewList>
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split("/")[0] === "image";
                        return (
                            <PreviewContainer key={fileName}>
                                <div>
                                    {isImageFile && (
                                        <ImagePreview src={URL.createObjectURL(file)} alt={`file preview ${index}`} />
                                    )}
                                    <FileMetaData isImageFile={isImageFile}>
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <RemoveFileIcon
                                                className="fas fa-trash-alt"
                                                onClick={() => removeFile(fileName)}
                                            />
                                        </aside>
                                    </FileMetaData>
                                </div>
                            </PreviewContainer>
                        );
                    })}
                </PreviewList>
            </FilePreviewContainer>
        </>
    );
};

export default FileUpload;
