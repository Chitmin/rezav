import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function isActiveRoute(name: string) {
    return route().current(name);
}

type NestedObject = {
    [key: string]: string | boolean | number | NestedObject | string[] | number[];
};

function searchParamsToNestedObject(searchParams: string | URLSearchParams): NestedObject {
    const result: NestedObject = {};
    const entries =
        searchParams instanceof URLSearchParams ? searchParams.entries() : new URLSearchParams(searchParams).entries();

    for (const [fullKey, value] of entries) {
        processURLSearchParamKeys(result, fullKey, convertURLSearchParamsValue(value));
    }

    return result;
}

function processURLSearchParamKeys(obj: NestedObject, fullKey: string, value: string | boolean | number): void {
    // Match keys like 'abc', 'abc[x]', 'abc[x][y]', etc.
    const match = fullKey.match(/^([^\[\]]+)(?:\[([^\[\]]+)\])*$/);

    if (!match) {
        obj[fullKey] = value;
        return;
    }

    const mainKey = match[1];
    const nestedKeys =
        fullKey
            .slice(mainKey.length)
            .match(/\[([^\[\]]+)\]/g)
            ?.map((k) => k.slice(1, -1)) || [];

    let currentObj = obj;

    // Create or traverse the nested structure
    if (!currentObj[mainKey]) {
        currentObj[mainKey] = nestedKeys.length > 0 ? {} : value;
    }

    if (nestedKeys.length === 0) {
        return;
    }

    currentObj = currentObj[mainKey] as NestedObject;

    for (let i = 0; i < nestedKeys.length; i++) {
        const key = nestedKeys[i];
        const isLast = i === nestedKeys.length - 1;

        if (!currentObj[key] && !isLast) {
            currentObj[key] = {};
        }

        if (isLast) {
            currentObj[key] = value;
        } else {
            currentObj = currentObj[key] as NestedObject;
        }
    }
}

function convertURLSearchParamsValue(value: string): string | boolean | number {
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(Number(value))) return Number(value);
    return value;
}

function titleCase(str: string) {
    return str
        .toLowerCase()
        .split(' ')
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
}

export { cn, isActiveRoute, searchParamsToNestedObject, titleCase };
