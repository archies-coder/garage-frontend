import { CustomAutoComplete } from 'components/inputs/CustomAutoComplete'
import React from 'react'

interface IVehicleFormConfig {
    name: string
    id: string
    section: string
    seq: number
    isChecked?: boolean
    required?: boolean
    component?: any
}

export const config: IVehicleFormConfig[] = [
    {
        name: 'Vehicle Make',
        id: 'make',
        section: 'VI',
        seq: 1,
        required: true,
    },
    {
        name: 'Vehicle Model',
        id: 'model',
        section: 'VI',
        seq: 2,
        required: false,
    },
    // {
    //     name: "Visitor's Gender",
    //     id: 'gender',
    //     section: 'VI',
    //     seq: 2,
    //     // component: ({ gender, style, disabled }: any) => (
    //     //     <CustomAutoComplete
    //     //         style={style}
    //     //         required
    //     //         // options={gender.options}
    //     //         label="Visitor's Gender"
    //     //         name="gender"
    //     //         // onChange={(value: any) =>
    //     //         //     gender.onChange({
    //     //         //         gender: value,
    //     //         //     })
    //     //         // }
    //     //         // disabled={disabled}
    //     //         // value={gender.value}
    //     //         // defaultValue={gender.value}
    //     //     />
    //     // ),
    // },

    {
        name: 'Address/Locality/City',
        // isChecked: false,
        id: 'city',
        section: 'OI',
        seq: 9,
    },

    {
        name: 'Vehicle Number',
        id: 'vehicleNo',
        section: 'VI',
        seq: 0,
        component: ({ vehicles, style }: any) => (
            <CustomAutoComplete
                style={style}
                required
                options={vehicles.options}
                label="Vehicle Number"
                name="vehicleNo"
                onChange={(value: any) =>
                    vehicles.onChange({
                        vehicleNo: value,
                    })
                }
                value={vehicles.value}
            />
        ),
    },
    //  {
    //     name: 'No. Of visitors',
    //     id: 'noofvisitor',
    //     section: 'VI',
    //     seq: 7,
    //         component: ({ visitors, style }: any) => <CustomAutoComplete
    //             style={style}
    //             required
    //             options={visitors.options}
    //             label="no of visitors"
    //             name="noofvisitor"
    //             onChange={(value: any) => visitors.onChange({
    //                 noofvisitor: value
    //             })}
    //             value={visitors.value} />
    // },
    {
        name: 'Owner Number',
        id: 'mobile',
        section: 'OI',
        seq: 0,
    },

    {
        name: 'Owner Name',
        id: 'name',
        section: 'OI',
        seq: 2,
    },

    {
        name: 'Purpose',
        id: 'purpose',
        section: 'VI',
        seq: 6,
        // component: ({ purpose, style, disabled }: any) => (
        //     <CustomAutoComplete
        //         style={style}
        //         required
        //         // options={purpose.options}
        //         label="Purpose to visit"
        //         name="purpose"
        //         // onChange={(value: any) =>
        //         //     purpose.onChange({
        //         //         purpose: value,
        //         //     })
        //         // }
        //         // value={purpose.value}
        //         // disabled={disabled}
        //         // defaultValue={purpose.value}
        //     />
        // ),
    },

    {
        name: 'Remark',
        id: 'remark',
        section: 'VI',
        seq: 6,
    },

    {
        name: 'Vehicle Type',
        section: 'VI',
        seq: 5,
        id: 'vehicleType',
        // component: ({ usertype, style, disabled }: any) => (
        //     <CustomAutoComplete
        //         style={style}
        //         required
        //         // options={usertype.options}
        //         label="Visitor Type"
        //         name="usertype"
        //         // onChange={(value: any) =>
        //         //     usertype.onChange({
        //         //         usertype: value,
        //         //     })
        //         // }
        //         // value={usertype.value}
        //         // disabled={disabled}
        //         // defaultValue={usertype.value}
        //     />
        // ),
    },
]
