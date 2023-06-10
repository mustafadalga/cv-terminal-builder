import FontSizeInput from './FontSizeInput';
import FontFamilyInput from './FontFamilyInput';
import TextShadowInput from './TextShadowInput';
import BorderRadiusInput from './BorderRadiusInput';
import ThemeInputBackground from './ThemeInputBackground';
import ThemeInputForeground from './ThemeInputForeground';
import PaddingInput from './PaddingInput';

export default function(){
    return (
        <div>
            <FontSizeInput />
            <FontFamilyInput />
            <TextShadowInput />
            <BorderRadiusInput />
            <ThemeInputBackground />
            <ThemeInputForeground />
            <PaddingInput/>
        </div>
    );
};

