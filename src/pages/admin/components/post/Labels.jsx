import React, { useEffect, useState } from "react";
import { CheckboxGroup } from "@nextui-org/react";
import { CustomCheckbox } from "./CheckBox";
import Axios from "../../utils/axios";
import { BaseUrl } from "../../utils/constData";

export default function Labels({ groupSelected, setGroupSelected }) {
    const [labels, setLabels] = useState([])
    useEffect(() => {
        Axios.get(BaseUrl + 'labels/').then((res) => {
            console.log("labels : ", res.data);
            setLabels(res.data)
        })
    }, [])
    return (
        <div className="flex flex-col gap-1 w-full">
            <CheckboxGroup
                className="gap-1"
                label="Select Labels"
                orientation="horizontal"
                value={groupSelected}
                onChange={setGroupSelected}
            >
                {labels.map((data) => (
                    <CustomCheckbox key={data.id} value={data.id}>{data.name}</CustomCheckbox>
                ))}
            </CheckboxGroup>
            <p className="mt-4 ml-1 text-default-500">
                Selected: {groupSelected.join(", ")}
            </p>
        </div>
    );
}
