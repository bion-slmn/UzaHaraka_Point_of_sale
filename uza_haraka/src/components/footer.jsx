import { Spacer } from '@chakra-ui/react';
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react';

function FooterView() {
  return (
    <Footer  container className='flex fixed bg-teal-50 bottom-0 border-t w-full shadow-lg p-4'>
      <FooterCopyright href="#" by="UzaHaraka™" year={2024} />
      <Spacer />
      <FooterLinkGroup flexdirection="row" gap={4}>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  )
}

export default FooterView;