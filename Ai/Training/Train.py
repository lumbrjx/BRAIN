from tqdm import tqdm 
import torch 
from utils import evaluate,load_data,split_data
from torch.utils.data import DataLoader
from dataset import MachinesData
from model import FailureWatch
import torch.nn as nn


Labels_map = ["Fail","no Fail"]
device = torch.device("cuda")
BATCH_SIZE = 64
LR = 0.001
DROPOUT = 0.6
EPOCHS  = 100
num_classes = 1



data = load_data()
train_data,test_data = split_data(data)
num_features = train_data.shape[1]-1

train_dataset = MachinesData(train_data.iloc[:,:-1].values,train_data.iloc[:,-1].values,device)
test_dataset = MachinesData(test_data.iloc[:,:-1].values,test_data.iloc[:,-1].values,device)

train_loader = DataLoader(train_dataset,batch_size=BATCH_SIZE)
test_loader = DataLoader(test_dataset,batch_size=BATCH_SIZE)



model = FailureWatch(num_features,num_classes,DROPOUT).to(device)

def train(num_epochs,model,train_loader):

    optimizer = torch.optim.Adam(model.parameters(),LR)
    loss_function = nn.BCELoss()
    
    pbar = tqdm(total=train_data.shape[0]*num_epochs)
    for epoch in range(num_epochs):
        for batch_idx,(batch_data,batch_labels) in enumerate(train_loader):
            pbar.set_description(f"Epoch {epoch}:")
            optimizer.zero_grad()
            outputs = model(batch_data)
            loss = loss_function(outputs.view(-1),batch_labels)
            loss.backward()
            optimizer.step()
            pbar.update(BATCH_SIZE)

    
    pbar.close()
        

    print(f"Epoch {epoch}: loss={float(loss):.4f}  ,",end=" ")
    evaluate(model,train_loader)

    return model

model = train(EPOCHS,model,train_loader)
acc = evaluate(model,test_loader)
torch.save(model.state_dict(),f"Ai/model/acc_{acc:.2f}_weights.pt")


