import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import uploadLogo from '../../assets/upload.png';
import archiveLogo from '../../assets/archive.png';

export const FileUpload: React.FC = () => {
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [error, setError] = useState<string>("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const acceptedFileExtensions: string[] = ["zip"];

    const acceptedFileTypesString = acceptedFileExtensions
        .map((ext) => `.${ext}`)
        .join(",");

    // const handleSubmit = () => {
    //     if (selectedFiles.length === 0) {
    //         setError("File is required");
    //     } else if (!error) {
    //         setSelectedFiles([]);
    //         setError("");
    //     }
    // };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newFilesArray = Array.from(event.target.files || []);
        processFiles(newFilesArray);
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        processFiles(droppedFiles);
    };

    const processFiles = (filesArray: File[]) => {
        const newSelectedFiles: any = [];
        let hasError = false;
        const fileTypeRegex = new RegExp(acceptedFileExtensions.join("|"), "i");

        filesArray.forEach((file) => {
            if (newSelectedFiles.some((f: any) => f.name === file.name)) {
                setError("File names must be unique");
                hasError = true;
            } else if (!fileTypeRegex.test(file.name.split(".").pop() || "")) {
                setError(`Only ${acceptedFileExtensions.join(", ")} files are allowed`);
                hasError = true;
            } else {
                newSelectedFiles.push(file);
            }
        });

        if (!hasError) {
            setError("");
            setSelectedFiles(newSelectedFiles);
        }
    };

    const handleCustomButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileDelete = (index: number) => {
        const updatedFiles = [...selectedFiles];
        updatedFiles.splice(index, 1);
        setSelectedFiles(updatedFiles);
    };

    return (
        <div className="flex justify-center items-center w-full">
            <div className="w-full p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div
                        className="min-h-[23rem] border-4 border-dashed border-blue-500 bg-blue-100 rounded-3xl p-4 flex flex-col justify-center items-center space-y-4"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        <img
                            src={uploadLogo}
                            alt="Upload Icon"
                            className="w-24 h-24 mb-2"
                        />
                        <p className="text-small font-semibold">Drag and Drop the files (.zip)</p>
                        <p className="text-small font-bold">or</p>
                        <button
                            type="button"
                            onClick={handleCustomButtonClick}
                            className="px-4 py-2 bg-blue-500 text-small text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Upload Files
                        </button>
                        <input
                            type="file"
                            id="files"
                            name="files"
                            accept={acceptedFileTypesString}
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                            onClick={(event) => {
                                // Reset the input value to allow selecting the same file again
                                event.currentTarget.value = "";
                            }}
                        />
                    </div>

                    <div className="w-full border-2 border-gray-300 rounded-3xl p-4 max-h-[23rem] flex flex-col flex-wrap items-center break-all">
                        {selectedFiles.length > 0 ? (
                            <>
                                {selectedFiles.map((file, index) => (
                                    <>
                                        <button
                                            type="button"
                                            onClick={() => handleFileDelete(index)}
                                            className="text-red-500 hover:text-red-700 focus:outline-none w-full justify-end flex"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="#5c98bd"
                                                className="w-[30px] h-[30px]"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    d="M6 4l8 8M14 4l-8 8"
                                                />
                                            </svg>
                                        </button>
                                            <img
                                                src={archiveLogo}
                                                alt="File Icon"
                                                className="w-24 h-24 mb-2 mt-6"
                                            />
                                            <span className="text-sm mt-4 font-semibold text-gray-500">{file.name}</span>
                                        </>
                                ))}
                                </>
                        ) : (
                            <div className="w-full h-full flex justify-center items-center">
                                <p className="text-small font-semibold text-gray-500 text-center">
                                    No Files Uploaded Yet
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                {/* <div className="flex justify-center mt-8">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                    >
                        Save
                    </button>
                </div> */}
            </div>
        </div>
    );
};
