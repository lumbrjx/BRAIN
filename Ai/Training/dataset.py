import torch 
from torch.utils.data import Dataset


class MachinesData(Dataset):
    def __init__(self,data,labels,device):
        self.data = torch.tensor(data,dtype=torch.float32,device=device)
        self.labels = torch.tensor(labels,dtype=torch.float32,device=device) 
        
    def __len__(self):
        return self.data.shape[0]
    def __getitem__(self, index) :
        return self.data[index],self.labels[index]




# if __name__ == "__main__":
#     data = load_data()
#     train_data,test_data = split_data(data)
#     print(f"train_data :{train_data.shape[0]}")
#     print(f"test_data :{test_data.shape[0]}")
