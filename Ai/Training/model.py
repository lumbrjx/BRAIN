import torch 
import torch.nn as nn



class FailureWatch(torch.nn.Module):
    def __init__(self,num_feat,num_classes,dropout_rate):
        super(FailureWatch,self).__init__()

        self.drop = nn.Dropout(dropout_rate)
        self.act = nn.ReLU()
        self.sigmoid = nn.Sigmoid()

        self.layer1 = nn.Linear(num_feat,128)
        self.layer2 = nn.Linear(128,256)
        self.layer3 = nn.Linear(256,1024)
        self.layer4 = nn.Linear(1024,1024)
        self.out_layer = nn.Linear(1024,num_classes)
    
    def forward(self,x):
        x = self.drop(self.act(self.layer1(x)))
        x = self.drop(self.act(self.layer2(x)))
        x = self.drop(self.act(self.layer3(x)))
        x = self.drop(self.act(self.layer4(x)))
        x = self.out_layer(x)
        return self.sigmoid(x)

