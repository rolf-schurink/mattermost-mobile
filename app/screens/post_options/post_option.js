// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    Platform,
    TouchableHighlight,
    TouchableNativeFeedback,
    View,
} from 'react-native';

import CompassIcon from '@components/compass_icon';
import {paddingLeft as padding} from '@components/safe_area_view/iphone_x_spacing';
import {changeOpacity, makeStyleSheetFromTheme} from '@utils/theme';
import {preventDoubleTap} from '@utils/tap';

export default class PostOption extends PureComponent {
    static propTypes = {
        destructive: PropTypes.bool,
        icon: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
        text: PropTypes.string.isRequired,
        isLandscape: PropTypes.bool.isRequired,
        theme: PropTypes.object.isRequired,
    };

    handleOnPress = preventDoubleTap(() => {
        this.props.onPress();
    }, 500);

    render() {
        const {destructive, icon, text, isLandscape, theme} = this.props;
        const style = getStyleSheet(theme);

        const Touchable = Platform.select({
            ios: TouchableHighlight,
            android: TouchableNativeFeedback,
        });

        const touchableProps = Platform.select({
            ios: {
                underlayColor: 'rgba(0, 0, 0, 0.1)',
            },
            android: {
                background: TouchableNativeFeedback.Ripple( //eslint-disable-line new-cap
                    'rgba(0, 0, 0, 0.1)',
                    false,
                ),
            },
        });

        return (
            <View style={style.container}>
                <Touchable
                    onPress={this.handleOnPress}
                    {...touchableProps}
                    style={[style.row, padding(isLandscape)]}
                >
                    <View style={style.row}>
                        <View style={[style.iconContainer]}>
                            <CompassIcon
                                name={icon}
                                size={24}
                                style={[style.icon, destructive ? style.destructive : null]}
                            />
                        </View>
                        <View style={style.textContainer}>
                            <Text style={[style.text, destructive ? style.destructive : null]}>
                                {text}
                            </Text>
                        </View>
                    </View>
                </Touchable>
                <View style={style.footer}/>
            </View>
        );
    }
}

const getStyleSheet = makeStyleSheetFromTheme((theme) => {
    return {
        container: {
            height: 51,
            width: '100%',
        },
        destructive: {
            color: '#D0021B',
        },
        row: {
            flex: 1,
            flexDirection: 'row',
        },
        iconContainer: {
            alignItems: 'center',
            height: 50,
            justifyContent: 'center',
            width: 60,
        },
        icon: {
            color: changeOpacity(theme.centerChannelColor, 0.64),
        },
        textContainer: {
            justifyContent: 'center',
            flex: 1,
            height: 50,
            marginRight: 5,
        },
        text: {
            color: theme.centerChannelColor,
            fontSize: 16,
            lineHeight: 19,
            opacity: 0.9,
            letterSpacing: -0.45,
        },
        footer: {
            marginHorizontal: 17,
            borderBottomWidth: 0.5,
            borderBottomColor: changeOpacity(theme.centerChannelColor, 0.2),
        },
    };
});
