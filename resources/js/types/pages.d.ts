declare namespace Pages {
    declare namespace AccessControl {
        interface RolesInput {
            roles: Record<App.Enums.RolesEnum, Record<string, boolean>>;
        }

        interface Props {
            roles: Role[];
            permissions: PermissionDto[];
        }
    }

    declare namespace Settings {
        interface Props {
            settingGroups: {
                General: App.Dtos.SettingValue[];
            };
        }

        interface FormInput {
            settings: {
                [key: App.Dtos.SettingValue['group']]: Record<App.Dtos.SettingValue.name, string | number | boolean>;
            };
        }
    }

    declare namespace Users {
        interface Props {
            users: Users[];
        }
    }
}
