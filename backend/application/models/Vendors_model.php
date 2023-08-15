<?php
class Vendors_model extends CI_Model
{
    public function list()
    {
        return $this->db->get('vendors')->result();
    }
    public function savevendors($data)
    {
        return $this->db->insert('vendors',$data);
    }
    public function deletevendors($id)
    {
        $this->db->where('id',$id)->delete('vendors');
    }

    public function editvendors($id)
    {
        return $this->db->where('id',$id)->get('vendors')->row();
    }
    public function updatevendors($data)
   {
      $this->db->where('id',$data['id'])->update('vendors',$data);
   }
  

}
