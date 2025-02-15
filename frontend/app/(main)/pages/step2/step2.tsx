'use client';
import { Button } from 'primereact/button';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { Tooltip } from 'primereact/tooltip';
import { useState} from 'react';
import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps'
import { Slider, SliderChangeEvent } from "primereact/slider";
import { InputText } from "primereact/inputtext";

interface step2Prob {
    setStep: React.Dispatch<React.SetStateAction<number>>;
    setBool: React.Dispatch<React.SetStateAction<boolean>>;
}

const Step2: React.FC<step2Prob> = ({setStep, setBool}) => {
    const [radioAge, setRadioAge] = useState<string | null>(null);
    const [radioGender, setRadioGender] = useState<string | null>(null);
    const [checkboxValue, setCheckboxValue] = useState<string[]>([]);
    const [checkboxEmote, setCheckboxEmote] = useState<string[]>([]);
    const [radioHair, setRadioHair] = useState<string | null>(null);
    const [value, setValue] = useState<number>(0.75);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = parseFloat(e.target.value);
        if (isNaN(inputValue)) inputValue = 0.75; // default if NaN
        inputValue = Math.max(0.65, Math.min(0.85, inputValue)); // clamp between 0.65 and 0.85
        setValue(inputValue);
    };
    const handleSliderChange = (e: SliderChangeEvent) => {
        if (typeof e.value === 'number') {
            setValue(e.value);
        }
    };

    const onCheckboxChange = (e: CheckboxChangeEvent) => {
        setCheckboxValue((prev) => (e.checked ? [...prev, e.value] : prev.filter((val) => val !== e.value)));
    };
    const onCheckboxEmote = (e: CheckboxChangeEvent) => {
        setCheckboxEmote((prev) => (e.checked ? [...prev, e.value] : prev.filter((val) => val !== e.value)));
    };
    const [activeIndex, setActiveIndex] = useState<number>(1);
    const items: MenuItem[] = [
        {label: 'Step 1'},
        {label: 'Step 2'},
        {label: 'Step 3'},
    ];

    const NextClick = async () => {
        const prompt = {
            age: radioAge,
            gender: radioGender,
            accessories: checkboxValue,
            hair: radioHair,
            emote: checkboxEmote,
            strength: value
        };

        const jsonString = JSON.stringify(prompt);
        sessionStorage.setItem('prompt', jsonString);
        setBool(true);
        setStep(2);
    };
    const BackClick = async () => {
        setStep(0);
    };

    return (
        <div className="grid p-fluid input-demo" >
            <div className='col-12'>
                <Steps model={items} activeIndex={activeIndex} onSelect={(e) => setActiveIndex(e.index)} />
            </div>
            <div className='col-12 md:col-6'>
                <div className="card" style={{height: '415px' }}>
                    <h6>Gender</h6>
                    <div className="grid">
                        {['Male', 'Female'].map((gender) => (
                            <div key={gender} className="col-12 md:col-3">
                                <div className="field-radiobutton">
                                    <RadioButton inputId={`gender-${gender}`} name="gender" value={gender} checked={radioGender === gender} onChange={(e) => setRadioGender(e.value)} />
                                    <label htmlFor={`gender-${gender}`}>{gender}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h6>Age</h6>
                    <div className="grid">
                        {['15 - 20', '21 - 40', '41 - 60'].map((ageRange) => (
                            <div key={ageRange} className="col-12 md:col-3">
                                <div className="field-radiobutton">
                                    <RadioButton inputId={`age-${ageRange}`} name="age" value={ageRange} checked={radioAge === ageRange} onChange={(e) => setRadioAge(e.value)} />
                                    <label htmlFor={`age-${ageRange}`}>{ageRange}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h6>Hair colour</h6>
                    <div className="grid">
                        {['Black', 'Red', 'Blue', 'Green', 'Pink', 'Orange'].map((hair) => (
                            <div key={hair} className="col-12 md:col-4">
                                <div className="field-radiobutton">
                                    <RadioButton inputId={`hair-${hair}`} name="gender" value={hair} checked={radioHair === hair} onChange={(e) => setRadioHair(e.value)} />
                                    <label htmlFor={`gender-${hair}`}>{hair}</label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='col-12 md:col-6'>
                <div className="card" style={{height: '415px'}}>
                    <h6>Accessories</h6>
                    <div className="grid">
                        {['Hat', 'Glasses'].map((accessory) => (
                            <div key={accessory} className="col-12 md:col-4">
                                <div className="field-checkbox">
                                    <Checkbox inputId={`accessory-${accessory}`} name="accessory" value={accessory} checked={checkboxValue.includes(accessory)} onChange={onCheckboxChange} />
                                    <label htmlFor={`accessory-${accessory}`}>{accessory}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h6>Emote</h6>
                    <div className="grid">
                        {['Smile', 'Sad', 'Angry', 'Tired', 'Surprise', 'Adorable'].map((emote) => (
                            <div key={emote} className="col-12 md:col-4">
                                <div className="field-checkbox">
                                    <Checkbox inputId={`emote-${emote}`} name="emote" value={emote} checked={checkboxEmote.includes(emote)} onChange={onCheckboxEmote} />
                                    <label htmlFor={`emote-${emote}`}>{emote}</label>
                                </div>
                            </div>
                        ))}
                    </div>

                    <h6>strength</h6>
                    <div className="grid">
                        <InputText value={value.toString()} onChange={handleInputChange} className="w-full" />
                        <Slider
                            value={value} onChange={handleSliderChange} min={0.65} max={0.85} step={0.01} className="w-full" />
                    </div>
                </div>
            </div>
            <div className='col-12'>
                <div className="flex justify-content-center gap-2">
                    <Tooltip target=".back" content="Back to previous step" position="top" />
                    <Button
                        label="Back"
                        className="back"
                        style={{ margin: '0.25em 0.25em', width: '150px' }}
                        onClick={BackClick}
                    />
                    <Tooltip target=".next" content="Next step" position="top" />
                    <Button
                        label="Next"
                        className="next"
                        style={{ margin: '0.25em 0.25em', width: '150px' }}
                        onClick={NextClick}
                    />
                </div>
            </div>
        </div>
    );
};

export default Step2;