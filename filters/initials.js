const MULTI_LETTERS = ['cs', 'dz', 'dzs', 'gy', 'ly', 'ny', 'sz', 'ty', 'zs'];

export default function initials(name) {
    return name.split(' ')?.map(getInitialPart)?.join('') || '';
}

function getInitialPart(part) {
    let initial = part[0]?.toUpperCase();

    for (const x of MULTI_LETTERS.sort((a, b) => b.length - a.length)) {
        if (part.toLowerCase().startsWith(x.toLowerCase())) {
            initial = x;
            break;
        }
    }

    return initial ? initial.charAt(0).toUpperCase() + initial.slice(1) : '';
}
