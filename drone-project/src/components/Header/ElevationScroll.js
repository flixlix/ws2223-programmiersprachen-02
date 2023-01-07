import React from "react";
import { PropTypes } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";

export default function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
