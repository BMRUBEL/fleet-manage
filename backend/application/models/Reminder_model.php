<?php
class Reminder_model extends CI_Model
{
    public function list()
    {
        
            // $this->db->select('*')->from('reminder')->join('vehicles','reminder.vehicles_id=vehicles.id')->get()->result();

            $this->db->select('reminder.*, vehicles.name AS vehicleName')->from('reminder');
            return $this->db->join('vehicles','vehicles.id=reminder.vehicles_id')->get()->result();

        
        // $remind= return $this->db->get('reminder')->result();
        // $vehic= return $this->db->select('name')->where('vehicles_id','id')->get('vehicles');
        // return $remind,$vehic;
        // return $this->db->select('id,name')->get('vehicles')->result();
    }
    public function vehilelist()
    {
        return $this->db->get('vehicles')->result();
        // return $this->db->select('id,name')->get('vehicles')->result();
    }

    public function savereminder($data)
    {
        $this->db->insert('reminder',['vehicles_id'=>$data['vehicles_id'],'date'=>$data['date'],'message'=>$data['message']]);
        // $last_id=$this->db->insert_id();
        // $this->db->insert('customers',['admin_id'=>$last_id,'name'=>$data['name'],'email'=>$data['email'],'phone'=>$data['phone'],'address'=>$data['address'],'status'=>$data['status']]);
    }
    public function delete($id)
    {

        $this->db->where('id',$id)->delete('reminder');
        
    }

}
