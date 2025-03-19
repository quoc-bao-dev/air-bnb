import { useSearchParams } from 'next/dist/client/components/navigation';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { IconType } from 'react-icons';
import qs from 'query-string';
import { log } from 'console';

interface CategoryBoxProps {
    label: string;
    icon: IconType;
    selcted?: boolean;
    description: string;
}
const CategoryBox: React.FC<CategoryBoxProps> = ({ label, icon: Icon, description, selcted }) => {
    const router = useRouter();
    const params = useSearchParams();

    const handleClick = useCallback(() => {
        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString());
        }
        const updatedQuery: any = {
            ...currentQuery,
            category: label,
        };

        if (params?.get('category') === label) {
            delete updatedQuery.category;
        }

        const url = qs.stringifyUrl(
            {
                url: '/',
                query: updatedQuery,
            },
            { skipNull: true }
        );
        router.push(url);
    }, [label, params, router]);
    return (
        <div
            onClick={handleClick}
            className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selcted ? 'border-neutral-800' : 'border-transparent'}
        ${selcted ? 'text-neutral-800' : 'text-neutral-500'}
        `}
        >
            <Icon size={26} />
            <div className="font-semibold text-sm ">{label}</div>
        </div>
    );
};

export default CategoryBox;
