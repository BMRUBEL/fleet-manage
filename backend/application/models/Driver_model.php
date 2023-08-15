<?php



class Driver_model extends CI_Model
{
   public function list()
   {
      //  return $this->db->get('drivers')->result();
      return
         $this->db->select('*')
         ->from('drivers')
         ->join('admin', 'drivers.admin_id = admin.id')
         ->get()
         ->result();
   }
   // public function mahmud($data)
   // {
   //    $this->db->insert('admin', ['name' => $data['name'], 'email' => $data['email'], 'password' => $data['  '], 'role' => $data['role']]);
   //    $last_id = $this->db->insert_id();

   //    $this->db->insert('drivers', ['admin_id' => $last_id, 'phone' => $data['phone'], 'age' => $data['age'], 'license_no' => $data['license_no'], 'license_expire_date' => $data['license_expire_date'], 'experience' => $data['experience'], 'joining_date' => $data['joining_date'], 'reference' => $data['reference'], 'address' => $data['address'], 'status' => $data['status'], 'photo' => $data['photo'], 'documents' => $data['documents']]);

   // }
   public function deletedriver($id)
   {
      $this->db->where('admin_id', $id)->delete('drivers');
      $this->db->where('id', $id)->delete('admin');
   }
   public function editdrive($id)
   {
      // return $this->db->where('admin_id',$id)->get('drivers')->row();

      $this->db->from('drivers');
      $this->db->join('admin', 'drivers.admin_id = admin.id');
      return $this->db->where('admin_id', $id)->get()->row();
   }
   public function update_driver($data1, $name, $email, $password, $phone, $age, $license_no, $license_expire_date, $experience, $joining_date, $reference, $address, $status, $data, $id)
   {
      // $this->db->where('id',$data['id'])->update('drivers',$data);
      if ($data || $data1) {
         if ($data) {
            $this->db->where('id', $id)->update('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
            // var_dump($name);
      
      
             $this->db->where('admin_id', $id)->update('drivers', ['admin_id' => $id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status, 'documents' => $data]);
         }else{
            $this->db->where('id', $id)->update('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
            // var_dump($name);
      
      
             $this->db->where('admin_id', $id)->update('drivers', ['admin_id' => $id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status]);
         }
         if ($data1) {
            $this->db->where('id', $id)->update('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
            // var_dump($name);
      
      
             $this->db->where('admin_id', $id)->update('drivers', ['admin_id' => $id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status, 'photo' => $data1]);
         }else{
            $this->db->where('id', $id)->update('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
            // var_dump($name);
      
      
             $this->db->where('admin_id', $id)->update('drivers', ['admin_id' => $id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status]);
         }
         
       
      }else{
         $this->db->where('id', $id)->update('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
         // var_dump($name);
   
   
          $this->db->where('admin_id', $id)->update('drivers', ['admin_id' => $id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status]);
      }
    
   }
   // public function update_driver($data)
   // {
   //    // $this->db->where('id',$data['id'])->update('drivers',$data);
   //    $this->db->where('id', $data['id'])->update('admin', ['name' => $data['name'], 'email' => $data['email'], 'password' => $data['password'], 'role' => $data['role']]);

   //    $this->db->where('admin_id', $data['id'])->update('drivers', ['admin_id' => $data['id'], 'phone' => $data['phone'], 'age' => $data['age'], 'license_no' => $data['license_no'], 'license_expire_date' => $data['license_expire_date'], 'experience' => $data['experience'], 'joining_date' => $data['joining_date'], 'reference' => $data['reference'], 'address' => $data['address'], 'status' => $data['status'], 'photo' => $data['photo'], 'documents' => $data['documents']]);
   // }


   public function saveuser($data1, $name, $email, $password, $phone, $age, $license_no, $license_expire_date, $experience, $joining_date, $reference, $address, $status, $data)
   {

      $this->db->insert('admin', ['name' => $name, 'email' => $email, 'password' => $password, 'role' => 'Driver']);
      $last_id = $this->db->insert_id();

      $this->db->insert('drivers', ['admin_id' => $last_id, 'phone' => $phone, 'age' => $age, 'license_no' => $license_no, 'license_expire_date' => $license_expire_date, 'experience' => $experience, 'joining_date' => $joining_date, 'reference' => $reference, 'address' => $address, 'status' => $status, 'photo' => $data1, 'documents' => $data]);
   }
   //Driver report
   public function driver_list()
   {
      return $this->db->select('id, name')->where('role', 'driver')->get('admin')->result();
   }

   public function get_driverdetails($driverid, $date)
   {
      $this->db->select('name');
      $this->db->from('admin');
      $this->db->where('id', $driverid);
      $a = $this->db->get()->row();

      // $this->db->select('vehicles.name AS vehicleName');
      // $this->db->from('vehicles');
      // $this->db->join('bookings','bookings.vehicle_id=vehicles.id');
      // $sub_qu = $this->db->get_compiled_select();

      $this->db->select('bookings.start_date, bookings.status, bookings.start_location, bookings.end_location, vehicles.name as vehicleName');
      $this->db->from('bookings');
      $this->db->join('vehicles','bookings.vehicle_id=vehicles.id');
      $this->db->join('admin','bookings.driver_id=admin.id');
      $this->db->where('driver_id', $driverid);
      $this->db->where('date(start_date)', $date);
      $b = $this->db->get()->row();

      $this->db->select('amount,trans_date');
      $this->db->from('driver_payments');
      $this->db->where('driver_id', $driverid);
       $this->db->where('date(trans_date)', $date);
      $d = $this->db->get()->row();

      $data = array();
      if (isset($a->name)) {
         $data['name'] = $a->name;
      } 
      
      // else {
      //    $data['name'] = '';
      // }

      if (isset($b->start_date)) {
         $data['start_date'] = $b->start_date;
         $data['status'] = $b->status;
         $data['start_location'] = $b->start_location;
         $data['end_location'] = $b->end_location;
         $data['vehicleName'] = $b->vehicleName;
      } 
      
      // else {
      //    $data['start_date'] = '';
      //    $data['status'] = '';
      //    $data['start_location'] = '';
      //    $data['end_location'] = '';
      //    $data['vehicleName']='';
      // }

      if (isset($d->amount)) {
         $data['amount'] = $d->amount;
         $data['trans_date'] = $d->trans_date;
      } 
      
      // else {
      //    $data['amount'] = 0;
      // }

      $data['date'] = $date;

      return $data;
   }
}
