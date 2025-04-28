declare namespace App.Dtos {
    export type EnumPermission = {
        name: string;
        label: string;
        permissions: Array<any>;
    };
    export type SettingValue = {
        name: string;
        value: string | boolean | number;
        label: string;
        group: string;
        type: string;
        isNumeric: boolean;
    };
}
declare namespace App.Enums {
    export type RolesEnum = 'super-admin' | 'manager';
}
declare namespace App.Settings {
    export type General = {
        version: string;
    };
}
