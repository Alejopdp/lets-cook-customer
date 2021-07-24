export interface RecipeCardProps {
    style?: object,
    img: string,
    imgTags: string[],
    timeTag: string,
    difficultyTag: string,
    recipeName: string,
    handleClickOpenModal: () => void,
};