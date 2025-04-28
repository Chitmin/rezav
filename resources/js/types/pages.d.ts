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
}
