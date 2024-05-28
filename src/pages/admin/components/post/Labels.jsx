import React, { useEffect, useState } from "react";
import { Button, CheckboxGroup, Input } from "@nextui-org/react";
import { CustomCheckbox } from "./CheckBox";
import Axios from "../../utils/axios";
import { BaseUrl } from "../../utils/constData";

export default function Labels({ groupSelected, setGroupSelected }) {
    const [labels, setLabels] = useState([])
    const [addLabels, setAddLabels] = useState(false)
    const [newLabels, setNewLabels] = useState()

    useEffect(() => {
        Axios.get(BaseUrl + 'labels/').then((res) => {
            console.log("labels : ", res.data);
            setLabels(res.data)
        })
    }, [addLabels])

    const submit = () => {
        Axios.post(BaseUrl + "labels/", { name: newLabels })
            .then((res) => {
                console.log(res.data)
                setAddLabels(false)
            })
            .catch((err) => console.error(err))
    }
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
                <span onClick={() => setAddLabels(true)} className="bg-gray-600 text-white p-1 px-3 rounded-full text-[14px] border-3" variant="faded">
                    Add
                </span>
            </CheckboxGroup>
            {addLabels == true ? (
                <div className="pt-3 mt-3 bg-green-50 p-2 rounded-lg">
                    <Input type="text" label="New label name" description="This input help to create a new label." value={newLabels} onChange={(e) => setNewLabels(e.target.value)} />
                    <Button variant="faded" onClick={submit} className="bg-green-400">Submit</Button>
                </div>
            ) : (
                <p className="mt-4 ml-1 text-default-500">
                    Selected: {groupSelected.join(", ")}
                </p>
            )}

        </div>
    );
}
