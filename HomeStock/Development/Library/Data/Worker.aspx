<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Worker.aspx.cs" Inherits="HomeStock.Development.Library.Data.Worker" %>


<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls" TagPrefix="Control" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Schemas" TagPrefix="Schema" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Archives" TagPrefix="Archive" %>
<%@ Register Assembly="HomeStockLibrary" Namespace="HomeStockLibrary.Controls.ClientControls.Workers" TagPrefix="Data" %>

<asp:content runat="server" id="contentPlaceHolderID" contentplaceholderid="MainViewContent">

    <Data:Worker runat="server" ID="HSworker" ArchiveID="sqlHomeStock" />
    
    <Archive:WebSQL runat="server" ID="sqlHomeStock" SchemaID="homeStockSchema" />

    <Schema:Schema runat="server" ID="homeStockSchema">
        <Entities>
            <Schema:Entity Name="Owner" IdentityPrefix="OWN" IdentityLength="12">
                <Columns>
                    <Schema:Column Name="Id" IdentityColumn="true" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="Home" IdentityPrefix="HOM" IdentityLength="12">
                <Columns>
                    <Schema:Column Name="Id" IdentityColumn="true" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="OwnerId" />
                </Columns>
            </Schema:Entity>
            <Schema:Entity Name="Container" IdentityPrefix="CNT" IdentityLength="12">
                <Columns>
                    <Schema:Column Name="Id" IdentityColumn="true" />
                    <Schema:Column Name="Name" />
                    <Schema:Column Name="Created" />
                    <Schema:Column Name="HomeId" />
                </Columns>
            </Schema:Entity>
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
</asp:content>
