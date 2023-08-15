<?php
class Rubel_model extends CI_Model
{
    // public function list()
    // {
    //     return $this->db->get('vehicles')->result();
    // }
    public function gettype()
    {
        return $this->db->select('id,title')->get('vehicle_type')->result();
    }
    public function gettitle()
    {
        $this->db->select('vehicles.*,vehicle_type.title as vehicle_title');
        $this->db->from('vehicles');
        $this->db->join('vehicle_type','vehicle_type.id=vehicles.type_id');
       $query= $this->db->get();
       return $query->result();
    }
    public function savevehicles($data)
    {
         $this->db->insert('vehicles',$data);
    }
    public function deletevehicle($id)
    {
        $this->db->where('id',$id)->delete('vehicles');
    }
    public function editvehicle($id)
    {
        return $this->db->where('id',$id)->get('vehicles')->row();
    }
    public function updatevehicle($data)
   {
      $this->db->where('id',$data['id'])->update('vehicles',$data);
      
   }
    public function type()
    {
        return $this->db->get('vehicle_type')->result();
    
    }
    public function savetype($data)
    {
        return $this->db->insert('vehicle_type',$data);
    }
    public function deletevehicle_type($id)
    {
        $this->db->where('id',$id)->delete('vehicle_type');
    }
    public function editvehicle_type($id)
    {
        return $this->db->where('id',$id)->get('vehicle_type')->row();
    }
    public function updatevehicle_type($data)
    {
        $this->db->where('id',$data['id'])->update('vehicle_type',$data);
    }
}
