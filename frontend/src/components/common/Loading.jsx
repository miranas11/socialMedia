import React from "react";
import { Puff } from "react-loader-spinner";

const Loading = () => {
    const loaderStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",

        backgroundColor: "rgba(255, 255, 255, 0.8)",
        zIndex: 9999,
    };

    return (
        <div style={loaderStyle}>
            <Puff
                visible={true}
                height="80"
                width="80"
                color="#C3A576"
                ariaLabel="puff-loading"
            />
        </div>
    );
};

export default Loading;
