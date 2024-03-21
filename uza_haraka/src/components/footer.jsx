import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from 'flowbite-react';

function FooterView() {
  return (
    <Footer  container className='top-auto bottom-0 w-full bg-teal-400'>
      <FooterCopyright href="#" by="UzaHaraka™" year={2024} />
      <FooterLinkGroup>
        <FooterLink href="#">About</FooterLink>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Licensing</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}

export default FooterView;