export const sortDataByDateASC = (data: any) => {
    const sortedData = data.sort((a: any, b: any) =>
        b.attributes.createdAt < a.attributes.createdAt
            ? 1
            : b.attributes.createdAt === a.attributes.createdAt
            ? 0
            : -1
    );

    return sortedData;
};

export const sortDataByMintDateASC = (data: any) => {
    const sortedData = data.sort((a: any, b: any) =>
        b.attributes.mintDate < a.attributes.mintDate
            ? 1
            : b.attributes.mintDate === a.attributes.mintDate
            ? 0
            : -1
    );

    return sortedData;
};

export const sortDataByDateDESC = (data: any) => {
    const sortedData = data.sort((a: any, b: any) =>
        b.attributes.createdAt > a.attributes.createdAt
            ? 1
            : b.attributes.createdAt === a.attributes.createdAt
            ? 0
            : -1
    );

    return sortedData;
};

export const sortDataByMintDateDESC = (data: any) => {
    const sortedData = data.sort((a: any, b: any) =>
        b.attributes.mintDate > a.attributes.mintDate
            ? 1
            : b.attributes.mintDate === a.attributes.mintDate
            ? 0
            : -1
    );

    return sortedData;
};
