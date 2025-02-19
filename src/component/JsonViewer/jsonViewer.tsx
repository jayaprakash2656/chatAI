import React, { useEffect, useState } from "react";
import { exportToExcel } from "../ExportToExcel/exportToExcel";
import { IconButton, Tooltip } from '@mui/material';
import { Download, UnfoldLessOutlined, UnfoldMoreOutlined } from "@mui/icons-material";


interface JsonViewerProps {
    data: any;
}

export const JsonViewer: React.FC<JsonViewerProps> = ({ data }) => {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});


    const expandAll = (obj: any, prefix = ".root"): Record<string, boolean> => {
        let initialState: Record<string, boolean> = { [prefix]: true };
        Object.entries(obj).forEach(([key, value]) => {
            const newKey = `${prefix}.${key}`;
            if (typeof value === "object" && value !== null) {
                initialState[newKey] = true;
                Object.assign(initialState, expandAll(value, newKey));
            }
        });
        return initialState;
    };

    const collapseAll = () => {
        setExpanded({ ['.root']: false });
    }

    useEffect(() => {
        setExpanded(expandAll(data));
    }, [data]);

    useEffect(() => {
        console.log('expanded', expanded)
    }, [expanded]);
    const toggleExpand = (key: string) => {
        setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
    };



    const renderJson = (value: any, key: string, parentKey: string) => {
        const type = typeof value;
        const isObject = type === "object" && value !== null;
        const isArray = Array.isArray(value);
        const fullKey = `${parentKey}.${key}`;

        return (
            <div className="pl-4 border-l-2 border-gray-300">
                {isObject ? (
                    <>
                        <button
                            className="bg-grey-300 hover:underline"
                            onClick={() => toggleExpand(fullKey)}
                        >
                            {expanded[fullKey] ? "▼" : "▶"} {key}
                        </button>
                        {expanded[fullKey] && (
                            <div className="ml-4">{Object.entries(value).map(([k, v]) => renderJson(v, k, fullKey))}</div>
                        )}
                    </>
                ) : isArray ? (
                    <>
                        <button
                            className="text-green-500 hover:underline"
                            onClick={() => toggleExpand(fullKey)}
                        >
                            {expanded[fullKey] ? "▼" : "▶"} {key} [{value.length}]
                        </button>
                        {expanded[fullKey] && (
                            <div className="ml-4">
                                {value.map((item, index) => (
                                    <div key={index} className="pl-4 border-l-2 border-gray-200">
                                        {renderJson(item, `${key}[${index}]`, fullKey)}
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div>
                        <span className="text-purple-500">{key}</span>: <span className="text-red-500">{JSON.stringify(value)}</span>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="p-4 bg-gray-100 rounded-lg shadow">
            <div className="flex justify-between items-center bg-indigo-500 text-white p-3 rounded-t-lg">
                <h2 className="text-lg font-bold">JSON Viewer</h2>
                <div>
                    <Tooltip title="Export to excel">
                        <IconButton aria-label="delete" size="large" title="Download" onClick={() => data && exportToExcel(data, "Complaince_Report")} disabled={!data}>
                            <Download sx={{ color: '#f5f5f5' }} />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={!expanded['.root'] ? "Expand All" : "Collapse All"}>
                        <IconButton aria-label="delete" size="large" title="toggle" onClick={() => { expanded['.root'] ? collapseAll() : setExpanded(expandAll(data)) }}>
                            {!expanded['.root'] ? <UnfoldLessOutlined sx={{ color: '#f5f5f5' }} /> : <UnfoldMoreOutlined sx={{ color: '#f5f5f5' }} />}
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            <div className="p-3 bg-white rounded-b-lg">{renderJson(data, "root", "")}</div>
        </div>
    );
};
