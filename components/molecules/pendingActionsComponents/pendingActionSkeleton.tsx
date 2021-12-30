import { Box } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import GeneralBox from "components/atoms/generalBox/generalBox";
import * as React from "react";

interface PendingActionSkeletonProps {
    height: number | string;
}

export default function PendingActionSkeleton(props: PendingActionSkeletonProps) {
    return (
        <Box marginBottom={2} marginRight={2}>
            <GeneralBox variant="small">
                <Box display="flex" width="100%">
                    <Skeleton variant="circle" width={72} height={72} style={{ marginRight: 16 }} />
                    <Box width="100%">
                        <Skeleton variant="text" width="100%" height={18} />
                        <Skeleton variant="text" width="100%" height={18} />
                        <Skeleton variant="text" width="100%" height={18} style={{ marginBottom: 16 }} />
                        <Skeleton variant="text" width="30%" height={32} />
                    </Box>
                </Box>
            </GeneralBox>
        </Box>
    );
}
