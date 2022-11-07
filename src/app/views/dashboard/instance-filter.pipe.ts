import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'instancefilter',
  pure: false
})
export class InstancefilterPipe implements PipeTransform {

  transform(instances: any[], filter: any): any {
    if (!instances || !filter) {
        return instances;
    }
    // filter items array, items which match and return true will be
    // kept, false will be filtered out
    //return users.filter(item => item.customer_type.toLowerCase().indexOf(filter.toLowerCase()) !== -1);

    return instances.filter(it=>{ 
      const InstanceId = it.InstanceId.toLowerCase().includes(filter.toLowerCase())  
      const InstanceType = it.InstanceType.toLowerCase().includes(filter.toLowerCase())
      const State = it.State.toLowerCase().includes(filter.toLowerCase())
      const LaunchTime = it.LaunchTime.toLowerCase().includes(filter.toLowerCase())
      const region = it.region.toString().includes(filter) 
      const account_name = it.account_name.toLowerCase().includes(filter.toLowerCase())
    
     
      //console.log( customer_type + mobile_number + email);
      return (InstanceId+ InstanceType+ State+ LaunchTime + region + account_name );      
  }) 

    
}

}