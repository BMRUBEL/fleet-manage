<?php
class Partsmanage_model extends CI_Model
{
    public function parts_list()
    {
        return $this->db->get('parts')->result();
    }
    public function save_parts($data)
    {
        return $this->db->insert('parts',$data);
    }

    public function edit_parts($id)
    {
      return $this->db->where('id',$id)->get('parts')->row();
    }

    public function update_parts($data)
    {
      return $this->db->where('id',$data['id'])->update('parts',$data);
    }
    
     public function delete_parts($id)
     {
         $this->db->where('id',$id)->delete('parts');
     }
}