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
    const fileInputField = useRef(null);
    const [files, setFiles] = useState<any>({});

    return (
        <>
            <FileUploadContainer>
                <InputLabel>{label}</InputLabel>
                <DragDropText>Drag and drop your files anywhere or</DragDropText>
                <UploadFileBtn type="button">
                    <i className="fas fa-file-upload" />
                    <span> Upload {otherProps.multiple ? "files" : "a file"}</span>
                </UploadFileBtn>
                <FormField type="file" ref={fileInputField} title="" value="" {...otherProps} />
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
                                            <RemoveFileIcon className="fas fa-trash-alt" />
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
