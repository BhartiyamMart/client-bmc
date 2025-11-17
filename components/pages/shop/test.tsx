import Container from '@/components/shared/container';
import Section from '@/components/shared/section';
import Image from 'next/image';
import React from 'react';

const Rest = () => {
  return (
    <Section>
      <Container>
        <div className="relative hidden w-full lg:block" style={{ aspectRatio: '5.45/1' }}>
          <Image
            src={'/temp/ab.png'}
            alt={'Featured Banner'}
            fill
            className="rounded-2xl object-cover select-none"
            sizes="(min-width: 1024px) 100vw, 0px"
            // priority={banner.priority === 1}
          />
        </div>
      </Container>
    </Section>
  );
};

export default Rest;
