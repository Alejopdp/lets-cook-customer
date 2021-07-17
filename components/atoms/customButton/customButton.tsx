import { ReactNode } from "react";
import clsx from "clsx";

import { Button, Box } from "@material-ui/core";
import { useStyles } from "./styles";
import { CustomButtonProps } from "./interfaces";

export const CustomButton = (props: CustomButtonProps) => {
    const { button, slimButton, box } = useStyles();

    return (
        <Button
            className={clsx(button, { [slimButton]: props.smallButton })}
            onClick={props.onClick}
            disabled={props.disabled}
            style={props.style}
        >
            <Box className={box}>
                {props.icon && (
                    <Box className={box} marginRight="8px">
                        {props.icon}
                    </Box>
                )}

                {props.text}
            </Box>
        </Button>
    );
};

export default CustomButton;
