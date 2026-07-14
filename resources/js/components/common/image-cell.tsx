type ImageCellProps = {
    imageUrl?: string | null;
    altText: string;
};

const PLACEHOLDER_IMAGE = '/placeholder.png';

export default function ImageCell({ imageUrl, altText }: ImageCellProps) {
    return (
        <div className="w-10 h-10 rounded-full overflow-hidden ring-1 ring-white shadow-sm shrink-0">
            <img
                className="w-full h-full object-cover"
                src={imageUrl || PLACEHOLDER_IMAGE}
                alt={altText}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                }}
            />
        </div>
    );
}