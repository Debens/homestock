<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Accordion.aspx.cs" Inherits="HomeStock.Development.Library.View.Accordion" %>

<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Archives" TagPrefix="Archive" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Schemas" TagPrefix="Schema" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Workers" TagPrefix="Data" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">
    
    <Control:PageHeader runat="server" Title="Accordion" Description="Below is an example of an accordion list. It's not really an accordion as you can have more than one open at a time, but hey ho." />

    <Control:AccordionList runat="server" VMBinding="dummyStock" HeaderText="Name" >
        <Content>
            <Control:TextBox runat="server" ID="tbx" Label="The Label" />
            <Control:TextBox runat="server" ID="TextBox1" Label="The Label" Tag="Hi, I'm a tbx" />
            <Control:Button runat="server" Text="Edit" />
            <Control:Button runat="server" Text="Delete" Type="Delete" />
        </Content>
    </Control:AccordionList>

    <Data:Worker runat="server" ID="dummyStock" ArchiveID="sqlHomeStock" />
    
    <Archive:WebSQL runat="server" ID="sqlHomeStock" SchemaID="homeStockSchema" />

    <Schema:Schema runat="server" ID="homeStockSchema">
        <Entities>
            <Schema:Entity Name="Stock" IdentityPrefix="STK" IdentityLength="40">
                <Columns>
                    <Schema:Column Name="Id" IdentityColumn="true" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="ContainerId" />
                    <Schema:Column Name="Tags" />
                    <Schema:Column Name="Expiry" />
                </Columns>
            </Schema:Entity>
        </Entities>
    </Schema:Schema>

    <script>
        HomeStock.on("PreVMRender", function () {
            var items = ["OJuice", "Bread", "Cheese", "Meat", "Milk"];
            for (var index = 0; index < items.length * 10; index++) {
                var item = items[index % items.length];
                HomeStock.Workers.dummyStock.Store.push({ Entries: { Name: item } });
            }
        });
    </script>
</asp:content>