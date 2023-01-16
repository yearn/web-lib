import { yToast } from '@yearn-finance/web-lib/components/yToast';
export function parseMarkdown(markdownText) {
    const htmlText = markdownText
        .replace(/\[(.*?)\]\((.*?)\)/gim, "<a class='link' target='_blank' href='$2'>$1</a>")
        .replace(/~~(.*?)~~/gim, "<span class='text-primary-500'>$1</span>")
        .replace(/\*\*(.*?)\*\*/gim, "<span class='font-bold'>$1</span>");
    return htmlText.trim();
}
export function copyToClipboard(value) {
    const { toast } = yToast();
    navigator.clipboard.writeText(value);
    toast({ content: 'Copied to clipboard!', type: 'info' });
}
export function slugify(text) {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}
export function isIframe() {
    if (typeof (window) === 'undefined') {
        return false;
    }
    if (window !== window.top || window.parent.frames.length > 0) {
        return true;
    }
    return false;
}
