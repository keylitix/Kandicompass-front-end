// app/social-share/[type]/[slug]/page.tsx

import { getShareContent } from '@/lib/socialShareData';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SocialButtons from '../../components/SocialButtons';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
import { CORE_FRONTEND_URL } from '@/helper/path';

interface Props {
    params: {
        type: string;
        slug: string;
    };
    searchParams: {
        from?: string;
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { type, slug } = params;
    const data = await getShareContent(type, slug);

    return {
        title: data.title,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: [data.imageURL],
            url: data.link,
        },
        twitter: {
            card: 'summary_large_image',
            title: data.title,
            description: data.description,
            images: [data.imageURL],
        },
    };
}


export default async function SharePage(props: Props) {
    const { type, slug } = props.params;
    const from = props.searchParams?.from || '/';

    const data = await getShareContent(type, slug);

    return (
        <div className="bg-wrapper">
            <div className="left-spark" />
            <div className="right-spark" />
            <div className="min-h-screen flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-center">{data.title}</h1>
                <p className="text-white text-center mt-2">{data.description}</p>

                {data.imageURL && (
                    <Image
                        src={data.imageURL}
                        alt="Share Image"
                        width={300}
                        height={300}
                        className="my-6 object-contain"
                        unoptimized
                    />
                )}

                <SocialButtons
                    url={data.link}
                    title={data.title}
                    description={data.description}
                />

                <Link href={from}>
                    <GradientButton className="mt-8">
                        Back to Previous Page
                    </GradientButton>
                </Link>
            </div>
        </div>
    );
}

