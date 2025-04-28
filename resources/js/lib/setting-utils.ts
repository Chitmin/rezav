export function transformSettingGroupsToFormValue(settingGroups: Pages.Settings.Props['settingGroups']) {
    return Object.values(settingGroups).reduce(
        (res, sg) => {
            sg.forEach((setting) => {
                res[setting.group] = {
                    ...res[setting.group],
                    [setting.name]: setting.value,
                };
            });

            return res;
        },
        {} as Pages.Settings.FormInput['settings'],
    );
}
