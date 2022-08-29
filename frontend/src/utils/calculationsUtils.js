export const FACTOR_CORRECTION_VALUES = [
    1,
    0.79,
    0.67,
    0.61,
    0.56,
    0.53
]

export const IMAX_VALUES = {
    111: "5 x 16",
    143: "3 x 25 + 16",
    173: "3 x 35 + 16",
    205: "3 x 50 + 25",
    252: "3 x 70 + 35",
    303: "3 x 95 + 50",
    346: "3 x 120 + 70",
    390: "3 x 150 + 70",
    441: "3 x 185 + 95",
    551: "3 x 240 + 120",
}

export function GetImax(amp, factor) {
    amp = parseFloat(amp);
    if (isNaN(amp)) {
        return undefined
    }

    // search for imax value that can contain the given ampacity 
    const imaxValues = Object.keys(IMAX_VALUES)
    for (const val of imaxValues) {
        let valWithFactor = val * factor;
        if (valWithFactor >= amp) {
            return {
                imax: val,
                imaxWithFactor: valWithFactor
            }
        }
    }

    // if nothing was found, return the biggest imax for now.
    // in the future, divide the amp into parts and return multiple imax values.
    // (the imax list is sorted)
    return {
        imax: Object.keys(IMAX_VALUES).at(-1),
        imaxWithFactor: Object.keys(IMAX_VALUES).at(-1) * factor
    }
}

export function GetFactorCorrection(numOfCalcs) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    return FACTOR_CORRECTION_VALUES[parseInt(clamp(numOfCalcs - 1, 0, 5))];
}

export function AddCalculator(calcsList, dataToAdd) {
    let updated_calcs = [...calcsList];
    const amp = parseFloat(dataToAdd.ampacity);
    if (amp > Object.keys(IMAX_VALUES).at(-1)) {
        var calcA = { ...dataToAdd };
        var calcB = { ...dataToAdd };
        calcA.ampacity = amp / 2;
        calcB.ampacity = amp / 2;
        updated_calcs.push(calcA);
        updated_calcs.push(calcB);
    } else {
        updated_calcs.push(dataToAdd);
    }
    return updated_calcs;
}

export function Calculate(calcs) {
    let newCalcsList = [];
    let factor = GetFactorCorrection(calcs.length);
    for (let calcData of calcs) {
        // Calculate imax, reserve and smm2
        let imaxResults = GetImax(calcData.ampacity, factor);
        if (imaxResults) {
            calcData.imax = imaxResults.imax;
            calcData.reserve = (Math.abs(imaxResults.imaxWithFactor - calcData.ampacity) / imaxResults.imaxWithFactor) * 100;
            calcData.smm2 = IMAX_VALUES[imaxResults.imax];
        }
        // add to the new list
        newCalcsList.push(calcData);
    }

    return newCalcsList
}

export function UpdateCalculator(calcsList, idx, data) {
    let newCalcsList = [...calcsList];
    newCalcsList[idx] = data;
    return newCalcsList;
}

export function DeleteCalculator (calcsList, idxToDelete) {
    let newList = [];
    for (let index = 0; index < calcsList.length; index++) {
        if (index !== idxToDelete) {
            newList.push(calcsList[index]);
        }
    }
    return newList;
}