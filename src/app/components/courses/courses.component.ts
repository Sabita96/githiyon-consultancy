import { ChangeDetectorRef, Component } from '@angular/core';
import { ExternalLibraryService } from '../navbar/util';
declare let Razorpay: any;

interface Profile {
  key: String;
  amount: String;
  name: String;
  order_id: String;
  description: String;
  image: String;
  prefill: {
    name: String;
    email: String;
    contact: String;
    method: String;
  };
  modal: {};
  theme: {
    color: String;
  };
  handler?: any;
}
declare var window: any;
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent {
  constructor(
    private cd: ChangeDetectorRef,
    private razorpayService: ExternalLibraryService
  ) {}
  response: any;
  razorpayResponse: any;
  showModal = false;
  formModal: any;
  ngOnInit() {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
      this.formModal = new window.bootstrap.Modal(
        document.getElementById('myModal')
      );
  }

  RAZORPAY_OPTIONS: Profile = {
    key: 'rzp_test_deH9LhEBSUAwA1',
    amount: '',
    name: 'Novopay',
    order_id: '',
    description: 'Load Wallet',
    image:
      'https://livestatic.novopay.in/resources/img/nodeapp/img/Logo_NP.jpg',
    prefill: {
      name: '',
      email: 'test@test.com',
      contact: '',
      method: '',
    },
    modal: {},
    theme: {
      color: '#0096C5',
    },
  };

  public proceed() {
    this.RAZORPAY_OPTIONS.amount = 100 + '00';

    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS.handler = this.razorPaySuccessHandler.bind(this);

    // this.showPopup();

    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }

  public razorPaySuccessHandler(response: any) {
    console.log(response);
    this.razorpayResponse = `Razorpay Response`;
    this.showModal = true;
    // (document.getElementById('razorpay-response') as any).style.display =
    //   'block';
    this.formModal.show();
    // this.cd.detectChanges();
  }

  public test() {
    (document.getElementById('response-modal') as any).style.display = 'block';
    this.response = `dummy text`;
  }
}
