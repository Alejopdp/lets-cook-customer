export interface RecipeCardProps  {
    img: string,
    imgTags: string[],
    timeTag: string,
    difficultyTag: string,
    recipeName: string,
    handleClickOpenModal: () => void,
};