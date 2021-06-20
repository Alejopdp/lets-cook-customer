import { SvgIcon } from "@material-ui/core";
export const FilterIcon = (props) => {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
                <path
                    style={{ transform: "translateX(4) translateY(4)" }}
                    id="Icon_awesome-filter"
                    data-name="Icon awesome-filter"
                    d="M13.343,0H.657A.657.657,0,0,0,.193,1.12L5.25,6.178v5.634a.656.656,0,0,0,.28.538l2.187,1.531a.657.657,0,0,0,1.033-.538V6.178L13.807,1.12A.657.657,0,0,0,13.343,0Z"
                />
            </svg>
        </SvgIcon>
    );
};
export default FilterIcon;
