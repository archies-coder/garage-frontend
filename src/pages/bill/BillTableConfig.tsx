import React, {MouseEventHandler} from 'react';
import {CustomMenuItem, CustomPlainMenuItem} from "../../components/CustomMenuItem";
import { Edit} from "@material-ui/icons"

interface IConfigProps {
    isLoading: boolean;
    data: any[]
    dispatchSetEditId: MouseEventHandler<HTMLSpanElement>
}

const columns = [{
    id: 'item',
    label: 'Item',
    editable: true
},{
    id: 'cost',
    label: 'Cost',
    editable: true
}]

const TableConfig = ({
isLoading,
    data,
    dispatchSetEditId,
    editHandler
}: any = {}) => ({
    columns,
    isLoading,
    data,
    editHandler,
    pagination: false,
    menuOptions: [{
        key: 'id',
// @ts-ignore
        item: (id: string) => <CustomPlainMenuItem>
            <Edit /> Edit
        </CustomPlainMenuItem>,
        callback: (id: string, e: any) => {
    debugger
    dispatchSetEditId(id)
}
    }]
})

export default TableConfig