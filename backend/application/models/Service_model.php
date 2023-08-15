<?php
Class Service_model extends CI_Model
{
    public function saveservice($data)
    {
         $this->db->insert('services',$data);
    }

    public function list()
    {
        // return $this->db->get('services')->result();
        $this->db->select('*');
        $this->db->from('services');
       $query= $this->db->get();
       return $query->result();
    
    }
 public function deleteservice($id)
    {
        $this->db->where('id',$id)->delete('services');
    }

public function editserv($id)
    {
        return $this->db->where('id',$id)->get('services')->row();
    }

    public function updateservice($data)
    {
       $this->db->where('id',$data['id'])->update('services',$data);
       
    }
}