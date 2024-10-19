import torch 
from sklearn.metrics import f1_score,accuracy_score
import os
import pandas as pd
import os 
from sklearn.model_selection import train_test_split


def load_data(path="Ai/Machines_2"):
    data = pd.read_csv(path+"/data.csv")

    labels = data.iloc[:,-1]
    data = data.iloc[:,:-1]

    normdata = (data- data.mean(axis=0))/data.std(axis=0)
    normdata = pd.concat([normdata,labels],axis=1)
    
    return normdata

def split_data(data,random_state = 12):
    train_data,test_data = train_test_split(data,test_size=0.2,random_state=random_state)
    return train_data,test_data



def evaluate(model,loader):
    model.eval()
    preds = []
    real = []

    with torch.no_grad() :
        for x , y in loader :
            out = model(x)
            out = out.to("cpu").numpy()
            y = y.to("cpu").numpy()

            pred = [0 if i<0.5 else 1 for i in out ]
            preds +=pred
            real += list(y)
    
    f1 = f1_score(preds,real)
    acc = accuracy_score(preds,real)
    print(f"accuracy score :{acc:.3f} ,f1 score :{f1:.3f}")
    model.train()
    return acc




