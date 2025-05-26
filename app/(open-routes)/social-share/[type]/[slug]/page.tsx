import { getShareContent } from '@/lib/socialShareData';
import Image from 'next/image';
import Link from 'next/link';
import SocialButtons from '../../components/SocialButtons';
import { GradientButton } from '@/app/_components/custom-ui/GradientButton';
import { Metadata, ResolvingMetadata } from 'next';

interface PageProps {
  params: { type: string; slug: string };
  searchParams?: { from?: string };
}

export async function generateMetadata(
    { params }: { params: { type: string; slug: string } }
): Promise<Metadata> {
    const data = await getShareContent(params.type, params.slug);
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

export default async function SharePage({ params, searchParams }: PageProps) {
    const from = searchParams?.from || '/';
    const data = await getShareContent(params.type, params.slug);

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

