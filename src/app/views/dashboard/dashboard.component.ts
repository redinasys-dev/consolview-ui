import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AdminService } from '../../admin/admin.service';
import { DashboardService } from './dashboard.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  radioModel: string = 'Month';
  accountList = [];
  accountListSettings:IDropdownSettings={};
  cloudProviders=[];
  cloudProvidersSettings:IDropdownSettings={};
  services=[];
  servicesSettings:IDropdownSettings={};

  isLoading:boolean=false;
  selectedCP=[];
  name=[{id:1,name:'shams'}];
  selectedServices=[];
  selectedAccounts=[];
  public activeTab: string="aws";
  account_type:string="aws"; 
  awsAccounts=[];
  azureAccounts=[];
  gcpAccounts=[]

  requestData=[];
  selectedAwsInstances=[];
  allAWSInstances=[];
  selectedAwsAccounts=[];

  

  TotalAWSAccounts:number=0;
  TotalAWSInstanceCount:number=0;
  TotalAWSRunningInstances:number=0;
  TotalAWSStoppedInstances:number=0;
  TotalLinuxCount:number=0;
  TotalWindowsCount:number=0;
  TotalRegionWiseInstances:any;
  regionArray=[];

  public total: number = 0;
	public page: number = 1;
	public limit: number = 10;
  json:any;
  term:any;

  constructor(private adminService:AdminService, private dashboardService:DashboardService,private modalService: NgbModal) {
      //location.reload();
      if(!localStorage.getItem('isReloaded')){
        localStorage.setItem("isReloaded", "true");
        location.reload();
      }
      
  }

  closeModel(){
		this.modalService.dismissAll();
  }

  openXl(content,json) {
    this.json=json;
    /* this.json={
      "Reservations": [
        {
          "Groups": [],
          "Instances": [
            {
              "AmiLaunchIndex": 0,
              "ImageId": "ami-0c02fb55956c7d316",
              "InstanceId": "i-064709ea97ca5bed7",
              "InstanceType": "t2.micro",
              "KeyName": "testredi",
              "LaunchTime": "2022-04-21T11:14:07.000Z",
              "Monitoring": {
                "State": "disabled"
              },
              "Placement": {
                "AvailabilityZone": "us-east-1c",
                "GroupName": "",
                "Tenancy": "default"
              },
              "PrivateDnsName": "ip-172-31-94-138.ec2.internal",
              "PrivateIpAddress": "172.31.94.138",
              "ProductCodes": [],
              "PublicDnsName": "",
              "State": {
                "Code": 80,
                "Name": "stopped"
              },
              "StateTransitionReason": "User initiated (2022-04-21 11:24:52 GMT)",
              "SubnetId": "subnet-0dd96acdf47dbc350",
              "VpcId": "vpc-0a6601c99cc3d8b11",
              "Architecture": "x86_64",
              "BlockDeviceMappings": [
                {
                  "DeviceName": "/dev/xvda",
                  "Ebs": {
                    "AttachTime": "2022-03-28T14:33:48.000Z",
                    "DeleteOnTermination": true,
                    "Status": "attached",
                    "VolumeId": "vol-07f80426f9b45d3f5"
                  }
                }
              ],
              "ClientToken": "",
              "EbsOptimized": false,
              "EnaSupport": true,
              "Hypervisor": "xen",
              "ElasticGpuAssociations": [],
              "ElasticInferenceAcceleratorAssociations": [],
              "NetworkInterfaces": [
                {
                  "Attachment": {
                    "AttachTime": "2022-03-28T14:33:47.000Z",
                    "AttachmentId": "eni-attach-064769b375a24517c",
                    "DeleteOnTermination": true,
                    "DeviceIndex": 0,
                    "Status": "attached",
                    "NetworkCardIndex": 0
                  },
                  "Description": "",
                  "Groups": [
                    {
                      "GroupName": "launch-wizard-3",
                      "GroupId": "sg-0bf1a3f476ab7832d"
                    }
                  ],
                  "Ipv6Addresses": [],
                  "MacAddress": "12:75:20:d3:f5:1b",
                  "NetworkInterfaceId": "eni-03888ee3161ce97df",
                  "OwnerId": "807210169580",
                  "PrivateDnsName": "ip-172-31-94-138.ec2.internal",
                  "PrivateIpAddress": "172.31.94.138",
                  "PrivateIpAddresses": [
                    {
                      "Primary": true,
                      "PrivateDnsName": "ip-172-31-94-138.ec2.internal",
                      "PrivateIpAddress": "172.31.94.138"
                    }
                  ],
                  "SourceDestCheck": true,
                  "Status": "in-use",
                  "SubnetId": "subnet-0dd96acdf47dbc350",
                  "VpcId": "vpc-0a6601c99cc3d8b11",
                  "InterfaceType": "interface",
                  "Ipv4Prefixes": [],
                  "Ipv6Prefixes": []
                }
              ],
              "RootDeviceName": "/dev/xvda",
              "RootDeviceType": "ebs",
              "SecurityGroups": [
                {
                  "GroupName": "launch-wizard-3",
                  "GroupId": "sg-0bf1a3f476ab7832d"
                }
              ],
              "SourceDestCheck": true,
              "StateReason": {
                "Code": "Client.UserInitiatedShutdown",
                "Message": "Client.UserInitiatedShutdown: User initiated shutdown"
              },
              "Tags": [
                {
                  "Key": "Name",
                  "Value": "Production"
                }
              ],
              "VirtualizationType": "hvm",
              "CpuOptions": {
                "CoreCount": 1,
                "ThreadsPerCore": 1
              },
              "CapacityReservationSpecification": {
                "CapacityReservationPreference": "open"
              },
              "HibernationOptions": {
                "Configured": false
              },
              "Licenses": [],
              "MetadataOptions": {
                "State": "applied",
                "HttpTokens": "optional",
                "HttpPutResponseHopLimit": 1,
                "HttpEndpoint": "enabled",
                "HttpProtocolIpv6": "disabled",
                "InstanceMetadataTags": "disabled"
              },
              "EnclaveOptions": {
                "Enabled": false
              },
              "PlatformDetails": "Linux/UNIX",
              "UsageOperation": "RunInstances",
              "UsageOperationUpdateTime": "2022-03-28T14:33:47.000Z",
              "PrivateDnsNameOptions": {
                "HostnameType": "ip-name",
                "EnableResourceNameDnsARecord": false,
                "EnableResourceNameDnsAAAARecord": false
              },
              "MaintenanceOptions": {
                "AutoRecovery": "default"
              }
            }
          ],
          "OwnerId": "807210169580",
          "ReservationId": "r-0814838c47a70bc5d"
        },
        {
          "Groups": [],
          "Instances": [
            {
              "AmiLaunchIndex": 0,
              "ImageId": "ami-03ededff12e34e59e",
              "InstanceId": "i-0d0d1f487fefd4dd4",
              "InstanceType": "t2.micro",
              "KeyName": "dhanrajsinha",
              "LaunchTime": "2022-04-21T11:23:35.000Z",
              "Monitoring": {
                "State": "disabled"
              },
              "Placement": {
                "AvailabilityZone": "us-east-1d",
                "GroupName": "",
                "Tenancy": "default"
              },
              "PrivateDnsName": "ip-172-31-25-78.ec2.internal",
              "PrivateIpAddress": "172.31.25.78",
              "ProductCodes": [],
              "PublicDnsName": "",
              "State": {
                "Code": 80,
                "Name": "stopped"
              },
              "StateTransitionReason": "User initiated (2022-04-21 18:45:38 GMT)",
              "SubnetId": "subnet-078a44a97903adf97",
              "VpcId": "vpc-0a6601c99cc3d8b11",
              "Architecture": "x86_64",
              "BlockDeviceMappings": [
                {
                  "DeviceName": "/dev/xvda",
                  "Ebs": {
                    "AttachTime": "2022-04-21T11:23:36.000Z",
                    "DeleteOnTermination": true,
                    "Status": "attached",
                    "VolumeId": "vol-08b32687d488d91b7"
                  }
                }
              ],
              "ClientToken": "",
              "EbsOptimized": false,
              "EnaSupport": true,
              "Hypervisor": "xen",
              "ElasticGpuAssociations": [],
              "ElasticInferenceAcceleratorAssociations": [],
              "NetworkInterfaces": [
                {
                  "Attachment": {
                    "AttachTime": "2022-04-21T11:23:35.000Z",
                    "AttachmentId": "eni-attach-08069a2529c227744",
                    "DeleteOnTermination": true,
                    "DeviceIndex": 0,
                    "Status": "attached",
                    "NetworkCardIndex": 0
                  },
                  "Description": "",
                  "Groups": [
                    {
                      "GroupName": "launch-wizard-6",
                      "GroupId": "sg-006f298c5c815b9f8"
                    }
                  ],
                  "Ipv6Addresses": [],
                  "MacAddress": "0a:8e:e5:97:f1:43",
                  "NetworkInterfaceId": "eni-04e51f5b0f72e7ca7",
                  "OwnerId": "807210169580",
                  "PrivateDnsName": "ip-172-31-25-78.ec2.internal",
                  "PrivateIpAddress": "172.31.25.78",
                  "PrivateIpAddresses": [
                    {
                      "Primary": true,
                      "PrivateDnsName": "ip-172-31-25-78.ec2.internal",
                      "PrivateIpAddress": "172.31.25.78"
                    }
                  ],
                  "SourceDestCheck": true,
                  "Status": "in-use",
                  "SubnetId": "subnet-078a44a97903adf97",
                  "VpcId": "vpc-0a6601c99cc3d8b11",
                  "InterfaceType": "interface",
                  "Ipv4Prefixes": [],
                  "Ipv6Prefixes": []
                }
              ],
              "RootDeviceName": "/dev/xvda",
              "RootDeviceType": "ebs",
              "SecurityGroups": [
                {
                  "GroupName": "launch-wizard-6",
                  "GroupId": "sg-006f298c5c815b9f8"
                }
              ],
              "SourceDestCheck": true,
              "StateReason": {
                "Code": "Client.UserInitiatedShutdown",
                "Message": "Client.UserInitiatedShutdown: User initiated shutdown"
              },
              "Tags": [],
              "VirtualizationType": "hvm",
              "CpuOptions": {
                "CoreCount": 1,
                "ThreadsPerCore": 1
              },
              "CapacityReservationSpecification": {
                "CapacityReservationPreference": "open"
              },
              "HibernationOptions": {
                "Configured": false
              },
              "Licenses": [],
              "MetadataOptions": {
                "State": "applied",
                "HttpTokens": "optional",
                "HttpPutResponseHopLimit": 1,
                "HttpEndpoint": "enabled",
                "HttpProtocolIpv6": "disabled",
                "InstanceMetadataTags": "disabled"
              },
              "EnclaveOptions": {
                "Enabled": false
              },
              "PlatformDetails": "Linux/UNIX",
              "UsageOperation": "RunInstances",
              "UsageOperationUpdateTime": "2022-04-21T11:23:35.000Z",
              "PrivateDnsNameOptions": {
                "HostnameType": "ip-name",
                "EnableResourceNameDnsARecord": false,
                "EnableResourceNameDnsAAAARecord": false
              },
              "MaintenanceOptions": {
                "AutoRecovery": "default"
              }
            }
          ],
          "OwnerId": "807210169580",
          "ReservationId": "r-0216afca16d01c5a5"
        }
      ]
    } */

    this.modalService.open(content, { size: 'xl', scrollable: true, backdropClass: 'light-grey-backdrop' });
  }


	  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
		  return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
		  return 'by clicking on a backdrop';
		} else {
		  return `with: ${reason}`;
		}
    }


  public pageChange(page: number): void {
		this.page = page;
  }

  getAllAwsInstances(body){

    this.isLoading = true;
    this.dashboardService.getAllAWSInstances({'data':body}).subscribe((response) => {
     console.log(response);
     this.isLoading = false;
     if(response['status']==200){
        const res=response['response'];
        this.selectedAwsInstances=res['AllInstances'];
        this.total=this.selectedAwsInstances.length;
        this.allAWSInstances=res['AllInstances'];
        this.TotalAWSAccounts=res['TotalAccounts'];
        this.TotalAWSInstanceCount=res['TotalInstanceCount'];
        this.TotalAWSRunningInstances=res['TotalRunningInstances'];
        this.TotalAWSStoppedInstances=res['StoppedInstances'];
        this.TotalRegionWiseInstances=res['RegionWiseInstances'];
        this.TotalLinuxCount=res['TotalLinuxPlatForm'];
        this.TotalWindowsCount=res['TotalWindowsPlatForm'];
        this.regionArray=[];

        for (var key in this.TotalRegionWiseInstances) {
          if (this.TotalRegionWiseInstances.hasOwnProperty(key)) {
            var val = this.TotalRegionWiseInstances[key];
            const data={};
            data['region']=key;
            data['count']=val;
            this.regionArray.push(data);
          }
        }

      
       
     }
     else{
      this.isLoading = false;
      alert(response['message']);
      
     }
   },
   (error) => {
     //alert(response['message']);
     this.isLoading = false;
     console.log(error.error);
     alert('Something went wrong. Please try again')
     //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
   } 
  )

  }


  getAllAccountsByType(){
    this.isLoading = true;
    this.dashboardService.getAllAccountsByType(this.account_type).subscribe((response) => {
     console.log(response);
     this.isLoading = false;
     if(response['status']==200){
       if(this.account_type=="aws"){
        this.awsAccounts=response['data'];
        /* 
        this.awsAccounts.forEach(async function(item){
          var obj={};
          obj['role_arn']=item['role_arn'];
          obj['account_name']=item['account_name'];
          this.requestData.push(obj);
        });
 */
        for(var i=0 ; i<this.awsAccounts.length;i++){
          var obj={};
          obj['role_arn']=this.awsAccounts[i]['role_arn'];
          obj['account_name']=this.awsAccounts[i]['account_name'];
          this.requestData.push(obj);
        }

        console.log(this.requestData);

        //var data={};
        //data['data']=this.requestData;

        this.getAllAwsInstances(this.requestData);
       }
          
       else if(this.account_type=="azure")
          this.azureAccounts=response["data"];
       else if(this.account_type=="gcp")
          this.gcpAccounts=response["data"]; 
  
         
  
     }
     else{
      this.isLoading = false;
      alert(response['message']);
      
     }
   },
   (error) => {
     //alert(response['message']);
     this.isLoading = false;
     console.log(error.error);
     alert('Something went wrong. Please try again')
     //this.makeToast('danger','Login Failed','Something went wrong! Please try again.');
   } 
  )
   }

  // lineChart1
  public lineChart1Data: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours: Array<any> = [
    {
      backgroundColor: getStyle('--primary'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend = false;
  public lineChart1Type = 'line';

  // lineChart2
  public lineChart2Data: Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours: Array<any> = [
    { // grey
      backgroundColor: getStyle('--info'),
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend = false;
  public lineChart2Type = 'line';


  // lineChart3
  public lineChart3Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend = false;
  public lineChart3Type = 'line';


  // barChart1
  public barChart1Data: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A',
      barPercentage: 0.6,
    }
  ];
  public barChart1Labels: Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend = false;
  public barChart1Type = 'bar';

  // mainChart

  public mainChartElements = 27;
  public mainChartData1: Array<number> = [];
  public mainChartData2: Array<number> = [];
  public mainChartData3: Array<number> = [];

  public mainChartData: Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Current'
    },
    {
      data: this.mainChartData2,
      label: 'Previous'
    },
    {
      data: this.mainChartData3,
      label: 'BEP'
    }
  ];
  /* tslint:disable:max-line-length */
  public mainChartLabels: Array<any> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday', 'Thursday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  /* tslint:enable:max-line-length */
  public mainChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips,
      intersect: true,
      mode: 'index',
      position: 'nearest',
      callbacks: {
        labelColor: function(tooltipItem, chart) {
          return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value: any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours: Array<any> = [
    { // brandInfo
      backgroundColor: hexToRgba(getStyle('--info'), 10),
      borderColor: getStyle('--info'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandSuccess
      backgroundColor: 'transparent',
      borderColor: getStyle('--success'),
      pointHoverBackgroundColor: '#fff'
    },
    { // brandDanger
      backgroundColor: 'transparent',
      borderColor: getStyle('--danger'),
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend = false;
  public mainChartType = 'line';

  // social box charts

  public brandBoxChartData1: Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public brandBoxChartData2: Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public brandBoxChartData3: Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public brandBoxChartData4: Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public brandBoxChartLabels: Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public brandBoxChartOptions: any = {
    tooltips: {
      enabled: false,
      custom: CustomTooltips
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        display: false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public brandBoxChartColours: Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public brandBoxChartLegend = false;
  public brandBoxChartType = 'line';

  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  ngOnInit(): void {

    this.getAllAccountsByType();


    this.cloudProviders = [
      { id: 1, name: 'AWS' },
      { id: 2, name: 'AZURE' },
      { id: 3, name: 'GCP' }
    ];

    this.cloudProvidersSettings = {
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: "Select All Cloud Providers From List",
      unSelectAllText: "UnSelect All Cloud Providers From List",
      noDataAvailablePlaceholderText: "There is no cloud provider availabale to show",
      allowSearchFilter: true
      
    };

    this.services = [
      { id: 1, name: 'EC2' },
      { id: 2, name: 'S3' },
      { id: 3, name: 'VPC' }
    ];

    this.servicesSettings = {
      idField: 'id',
      textField: 'name',
      enableCheckAll: true,
      selectAllText: "Select All Services From List",
      unSelectAllText: "UnSelect All Services From List",
      noDataAvailablePlaceholderText: "There is no service availabale to show",
      allowSearchFilter: true
      
    };

    this.accountList = [
      { id: 1, name: 'Star-Develop' },
      { id: 2, name: 'Star-Test' },
      { id: 3, name: 'Star-Prod' },
      { id: 4, name: 'Nav-Develop' },
      { id: 5, name: 'Nav-Test' },
      { id: 6, name: 'Nav-Prod' },
    /*   { id: 1, name: 'Star-Develop' },
      { id: 2, name: 'Star-Test' },
      { id: 3, name: 'Star-Prod' },
      { id: 4, name: 'Nav-Develop' },
      { id: 5, name: 'Nav-Test' },
      { id: 6, name: 'Nav-Prod' }, */
    ];
    this.accountListSettings = {
      idField: 'role_arn',
      textField: 'account_name',
      enableCheckAll: true,
      selectAllText: "Select All Accounts From List",
      unSelectAllText: "UnSelect All Accounts From List",
      noDataAvailablePlaceholderText: "There is no account availabale to show",
      allowSearchFilter: true
      
    };



    // generate random values for mainChart
    for (let i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(this.random(50, 200));
      this.mainChartData2.push(this.random(80, 100));
      this.mainChartData3.push(65);
    }
  }

onCloudProviderSelect(item: any) {
    console.log('onItemSelect', item);
    this.selectedCP.push(item);
    //console.log(this.selectedCP);
}
onCloudProviderDeSelect(item: any) {
    console.log('onItemDeSelect', item);
    const index = this.selectedCP.findIndex(data => data.id === item.id); 
    this.selectedCP.splice(index, 1); 
}
onCloudProviderSelectAll(items: any) {
    console.log('onSelectAll', items);
    this.selectedCP=items;
}
onCloudProviderUnSelectAll() {
    console.log('onUnSelectAll fires');
    this.selectedCP=[];
}



onServiceSelect(item: any) {
  console.log('onItemSelect', item);
  this.selectedServices.push(item);
}
onServiceDeSelect(item: any) {
  console.log('onItemDeSelect', item);
  const index = this.selectedServices.findIndex(data => data.id === item.id); 
  this.selectedServices.splice(index, 1); 
}
onServiceSelectAll(items: any) {
  console.log('onSelectAll', items);
  this.selectedServices=items;
}
onServiceUnSelectAll() {
  console.log('onUnSelectAll fires');
  this.selectedServices=[];
}

onAccountSelect(item: any) {
  console.log('onItemSelect', item);
  this.selectedAccounts.push(item);
  this.getSelectedAWSInstances(this.selectedAccounts);
}
onAccountDeSelect(item: any) {
  console.log('onItemDeSelect', item);
  const index = this.selectedAccounts.findIndex(data => data.id === item.id); 
  this.selectedAccounts.splice(index, 1); 
  this.getSelectedAWSInstances(this.selectedAccounts);
}
onAccountSelectAll(items: any) {
  console.log('onSelectAll', items);
  this.selectedAccounts=items;
  this.getSelectedAWSInstances(this.selectedAccounts);
}
onAccountUnSelectAll() {
  console.log('onUnSelectAll fires');
  this.selectedAccounts=[];
  this.getSelectedAWSInstances(this.selectedAccounts);
}

getSelectedAWSInstances(data){
  if(data.length==0){
    this.selectedAwsInstances=[];
    this.TotalAWSAccounts=0;
    this.TotalAWSInstanceCount=0;
    this.TotalAWSRunningInstances=0;
    this.TotalAWSStoppedInstances=0;
    this.TotalRegionWiseInstances=0;
    this.regionArray=[];
  }
  else{
    this.getAllAwsInstances(data);
  }

}

changeTab($event) {
  this.activeTab = $event.id;
  console.log(this.activeTab);
  this.account_type=this.activeTab;
}


}
