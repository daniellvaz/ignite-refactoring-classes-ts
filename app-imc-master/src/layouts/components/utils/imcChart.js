import React from "react";
import ReactSpeedometer from "react-d3-speedometer";

export default function (props) {

    return (
        <React.Fragment>
            {
                !props.isMobileVersion ?

                    <ReactSpeedometer
                        value={props.imc}
                        forceRender={false}
                        width={500}
                        height={300}
                        minValue={0}
                        maxValue={65}
                        ringWidth={150}
                        paddingVertical={10}
                        needleHeightRatio={0.8}
                        needleTransitionDuration={5000}
                        customSegmentStops={[0, 18.5, 25, 29, 38, 65]}

                        textColor={'#000'}
                        needleColor={'#000'}
                        valueTextFontSize={'24px'}
                        valueTextFontWeight={'900'}
                        needleTransition={'easeElastic'}
                        segmentColors={['#d8d8d8', '#2893fe', '#f5c724', '#ffa013', '#ff0000']}
                    />

                    :
                    <ReactSpeedometer
                        value={props.imc}
                        forceRender

                        width={window.innerWidth * 0.7}
                        height={250}
                        minValue={0}
                        maxValue={45}
                        ringWidth={120}
                        paddingVertical={10}
                        needleHeightRatio={0.8}
                        needleTransitionDuration={3500}
                        customSegmentStops={[0, 18.5, 25, 29, 38, 45]}

                        textColor={'#000'}
                        needleColor={'#000'}
                        valueTextFontSize={'24px'}
                        valueTextFontWeight={'900'}
                        needleTransition={'easeElastic'}
                        segmentColors={['#d8d8d8', '#2893fe', '#f5c724', '#ffa013', '#ff0000']}
                    />
            }
        </React.Fragment>
    )
}